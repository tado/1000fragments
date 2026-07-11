uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 zp = p * 8.50;
    vec2 zi = floor(zp); vec2 zf = fract(zp) - 0.5;
    if(hash21(zi + floor(t * 2.79)) < 0.5) zf.x = -zf.x;
    float zd = abs(zf.x + zf.y) * 0.7071068;
    v = sin(zd * 28.37 - t * 3.29 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.71;
	p = mix(p, p.yx, 0.5 + 0.5 * sin(time * 1.13));
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.68, lr * 2.32 + time * 0.44); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.14 + time * 0.26, vec3(0.48, 0.51, 0.46), vec3(0.43, 0.40, 0.47), vec3(0.94, 0.83, 1.04), vec3(0.61, 0.49, 0.20));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
