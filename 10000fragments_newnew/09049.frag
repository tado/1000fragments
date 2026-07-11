uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 zp = p * 6.06;
    vec2 zi = floor(zp); vec2 zf = fract(zp) - 0.5;
    if(hash21(zi + floor(t * 1.58)) < 0.5) zf.x = -zf.x;
    float zd = abs(zf.x + zf.y) * 0.7071068;
    v = sin(zd * 27.88 - t * 2.31 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 5.18, t * 1.76 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.64;
	vec2 q1 = p; vec2 q2 = p;
	q1 = rot2(time * 1.05) * q1;
	for(int fo = 0; fo < 3; fo++){ q1 = abs(q1) - 0.22; q1 = rot2(2.02) * q1; }
	q2 *= 1.0 + 0.19 * sin(time * 3.91);
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.59);
	float d = max(d1, d2);
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.02, 0.03, 0.22), vec3(0.65, 0.87, 0.53), cc);
	col *= 0.82 + 0.15 * sin(gl_FragCoord.y * 1.21 + time * 4.79);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
