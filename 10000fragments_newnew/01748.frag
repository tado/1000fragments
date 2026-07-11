uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 11.92 + t * 0.77 + ph) * 0.7;
    float wb = sin(p.y * 6.40 - t * 0.84 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.50;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float qa = atan(p.y, p.x);
    float qr = length(p);
    v = sin(qa * 6.0 + qr * 2.99 * sin(t * 1.20) + t * 3.49 + ph);
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.14; vec2 jc = vec2(-0.65 + 0.3 * sin(t * 0.77 + ph), 0.69 + 0.3 * cos(t * 1.29 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 28; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / 28.0 * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	{ q1 = vec2(atan(q1.y, q1.x) * 2.69, length(q1) * 2.98 - time * 0.67); }
	q1 = sin(q1 * 1.62 + time * 1.54) * 0.76;
	for(int fo = 0; fo < 3; fo++){ q2 = abs(q2) - 0.39; q2 = rot2(2.34) * q2; }
	q3 = vec2(q3.x * q3.x - q3.y * q3.y, 2.0 * q3.x * q3.y) * 0.73;
	q3 = rot2(length(q3) * -1.37 + time * 0.86) * q3;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.05);
	float d3 = fieldC(q3, time, 1.69);
	d2 = max(d2, d3);
	float d = d1 * d2;
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 2.48 + time * 0.79);
	col = floor(clamp(col, 0.0, 1.0) * 5.0) / 5.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
