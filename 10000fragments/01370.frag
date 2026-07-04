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
    float grow = floor(p.y * 10.49);
    float gsh = hash21(vec2(grow, floor(t * 7.06))) - 0.5;
    float gx = p.x + gsh * 1.07;
    v = sin(gx * 13.19 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 2.32));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.y += sin(p.x * 7.50 + time * 1.34) * 0.37;
	p = abs(p) - 0.31;
	p = rot2(length(p) * 3.96 + time * 0.89) * p;
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 0.65 + time * 0.21);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
