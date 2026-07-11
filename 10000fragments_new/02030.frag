uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 19.55);
    float gsh = hash21(vec2(grow, floor(t * 7.32))) - 0.5;
    float gx = p.x + gsh * 0.34;
    v = sin(gx * 9.16 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 3.14));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = rot2(time * -0.90) * p;
	{ p = vec2(atan(p.y, p.x) * 1.70, length(p) * 4.47 - time * 0.52); }
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.53, lr * 1.49 + time * 0.74); }
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.01 + time * 0.03);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
