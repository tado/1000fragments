uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 10; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 1.67 * sin(mf + 3.0) + ph), cos(t * 1.67 * cos(mf + 3.0) + ph));
        ms += 0.047 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.02, lr * 2.79 + time * 0.54); }
	p *= 2.46;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.53 + time * 0.10, vec3(0.43, 0.42, 0.41), vec3(0.48, 0.37, 0.37), vec3(0.77, 0.88, 1.07), vec3(0.16, 0.69, 0.46));
	col = mod(col * 2.87, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
