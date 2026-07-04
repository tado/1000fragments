uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 zp = p * 7.65;
    vec2 zi = floor(zp); vec2 zf = fract(zp) - 0.5;
    if(hash21(zi + floor(t * 2.93)) < 0.5) zf.x = -zf.x;
    float zd = abs(zf.x + zf.y) * 0.7071068;
    v = sin(zd * 17.66 - t * 7.65 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 14.64 + vec2(t * 2.64, -t * 1.46) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.16;
	vec2 q1 = p; vec2 q2 = p;
	{ float fr = length(q2); q2 *= 1.0 + 0.48 * fr * fr; }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.82);
	float d = 0.5 * (d1 + d2);
	vec3 col = hue(d * 1.40 + time * 0.27);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
