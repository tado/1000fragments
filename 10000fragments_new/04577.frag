uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 6.47);
    float gsh = hash21(vec2(grow, floor(t * 8.38))) - 0.5;
    float gx = p.x + gsh * 0.73;
    v = sin(gx * 7.71 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 3.60));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.61;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.96, lr * 1.34 + time * -0.80); }
	p.y += sin(p.x * 6.26 + time * 3.92) * 0.37;
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 0.64 + time * 0.17);
	col = clamp((col - 0.5) * 2.06 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
