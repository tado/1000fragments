uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 8.18);
    float gsh = hash21(vec2(grow, floor(t * 2.76))) - 0.5;
    float gx = p.x + gsh * 0.80;
    v = sin(gx * 19.86 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 1.75));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.89;
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.18 + time * 0.24);
	col = clamp((col - 0.5) * 2.10 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
