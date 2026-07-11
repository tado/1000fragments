uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.23; vec2 jc = vec2(0.22 + 0.3 * sin(t * 1.75 + ph), -0.36 + 0.3 * cos(t * 0.52 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 21; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / 21.0 * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 zp = p * 8.86;
    vec2 zi = floor(zp); vec2 zf = fract(zp) - 0.5;
    if(hash21(zi + floor(t * 1.99)) < 0.5) zf.x = -zf.x;
    float zd = abs(zf.x + zf.y) * 0.7071068;
    v = sin(zd * 16.41 - t * 4.82 + ph);
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.57, 0.0)) * 14.95 - t * 3.57 + ph);
    float mb = sin(length(p + vec2(0.57, 0.0)) * 12.27 - t * 2.81 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.57;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q2 = fract(q2 * 2.43) - 0.5;
	for(int fo = 0; fo < 3; fo++){ q3 = abs(q3) - 0.38; q3 = rot2(2.54) * q3; }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.62);
	float d3 = fieldC(q3, time, 0.06);
	d2 = min(d2, d3);
	float d = d1 * d2;
	vec3 col = vec3(0.27, 0.91, 0.18) * (0.09 / (abs(d) + 0.02));
	col = col / (1.0 + col);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.07 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
