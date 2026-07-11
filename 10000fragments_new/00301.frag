uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 8.72 + t * 3.90 + ph) + sin(p.y * 6.58 - t * 3.90 + ph)
        + sin((p.x + p.y) * 6.97 + t * 3.90 + ph) + sin(length(p) * 4.55 - t * 3.90 + ph));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float qa = atan(p.y, p.x);
    float qr = length(p);
    v = sin(qa * 7.0 + qr * 6.13 * sin(t * 0.73) + t * 5.85 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.89;
	vec2 q1 = p; vec2 q2 = p;
	for(int fo = 0; fo < 5; fo++){ q2 = abs(q2) - 0.47; q2 = rot2(1.74) * q2; }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.33);
	float d = abs(d1 - d2);
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.34, 0.33, 0.22), vec3(0.56, 0.75, 0.92), cc);
	col = mod(col * 2.32, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
