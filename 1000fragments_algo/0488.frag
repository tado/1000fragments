uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int li = 0; li < 24; li++){ float lt = float(li) * 0.2617994;
        vec2 lp = vec2(sin(lt * 2.0 + t * 1.40 + ph), sin(lt * 1.0 + t * 0.79)) * 0.64;
        md = min(md, length(p - lp)); }
    v = exp(-md * 4.30) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.30 + 0.28 * pow(abs(cos(ra * 5.0 + t * 1.95)), 0.78);
    v = sin((rr - pet) * 19.87 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec2 q1 = p; vec2 q2 = p;
	q1 = mix(q1, q1.yx, 0.5 + 0.5 * sin((time * 0.72) * 2.35));
	q2 = rot2(q2.y * 1.95 + (time * 0.72) * 0.30) * q2;
	float d1 = fieldA(q1, (time * 0.72), 0.0);
	float d2 = fieldB(q2, (time * 0.72), 1.87);
	float d = d1 * d2;
	float cc = clamp(0.5 + 0.5 * (d), 0.0, 1.0);
	vec3 col = mix(vec3(0.41, 0.19, 0.40), vec3(0.71, 0.52, 0.70), smoothstep(0.0, 1.0, cc));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.99));
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.46);
	col = clamp(col, 0.0, 1.0) * vec3(0.977, 1.012, 0.935) * 1.00 + 0.047;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
