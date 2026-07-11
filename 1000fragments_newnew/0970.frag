uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 7.62) - 0.5;
    float rad = 0.26 + 0.12 * sin(t * 1.76 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float pa = atan(p.y, p.x) + t * 0.79;
    float pk = 6.2831853 / 5.0;
    float pd = cos(floor(0.5 + pa / pk) * pk - pa) * length(p);
    v = sin(pd * 13.72 - t * 1.12 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.34;
	vec2 q1 = p; vec2 q2 = p;
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; q2.x += 0.43 / wf * sin(wf * 3.49 * q2.y + (time * 0.80) * 1.10); q2.y += 0.27 / wf * cos(wf * 2.43 * q2.x + (time * 0.80) * 0.65); }
	q2 = rot2(3.05) * q2;
	float d1 = fieldA(q1, (time * 0.80), 0.0);
	float d2 = fieldB(q2, (time * 0.80), 0.47);
	float d = min(d1, d2);
	vec3 col = vec3(0.5 + 0.5 * (d)) * vec3(0.46, 0.60, 0.44) + vec3(0.06, 0.09, 0.10);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.53);
	col = clamp(col, 0.0, 1.0) * vec3(0.918, 0.986, 1.057) * 1.00 + 0.039;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
