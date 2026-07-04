uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 zp = p * 3.36;
    vec2 zi = floor(zp); vec2 zf = fract(zp) - 0.5;
    if(hash21(zi + floor(t * 2.33)) < 0.5) zf.x = -zf.x;
    float zd = abs(zf.x + zf.y) * 0.7071068;
    v = sin(zd * 15.30 - t * 6.21 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 18.63 + sin(p.y * 2.74 + t * 5.01) * 3.03 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.39;
	vec2 q1 = p; vec2 q2 = p;
	q2 *= 1.76;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.56);
	float d = abs(d1 - d2);
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.24, 0.36, 0.47), vec3(0.91, 0.84, 0.97), cc);
	col = fract(col * 1.31);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
