uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float fieldA(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.21, 0.0)) * 15.85 - t * 2.75 + ph);
    float mb = sin(length(p + vec2(0.21, 0.0)) * 20.81 - t * 6.09 + ph);
    v = ma * mb;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.50; vec2 jc = vec2(-0.30 + 0.3 * sin(t * 1.70 + ph), 0.19 + 0.3 * cos(t * 1.25 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 38; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / 38.0 * 2.0 - 1.0;
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    float zx = abs(fract(p.x * 2.91 + t * 1.15) - 0.5) * 2.0;
    v = sin((p.y * 3.21 + zx * 1.24 + t * 2.83) * 3.1415927 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.70;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	{ float iv = dot(q1, q1) + 0.05; q1 = q1 / iv * 0.65; }
	q1 = rot2(1.36) * q1;
	{ float ka = atan(q2.y, q2.x); float kr = length(q2); float kn = 7.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); q2 = kr * vec2(cos(ka), sin(ka)); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.03);
	float d3 = fieldC(q3, time, 0.65);
	d2 = min(d2, d3);
	float d = d1 * d2;
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 1.78 + time * 0.72);
	col += (hash21(gl_FragCoord.xy + fract(time) * 100.0) - 0.5) * 0.11;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
