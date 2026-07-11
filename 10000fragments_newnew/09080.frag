uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 9.62);
    float gsh = hash21(vec2(grow, floor(t * 5.55))) - 0.5;
    float gx = p.x + gsh * 0.68;
    v = sin(gx * 6.14 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 1.28));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = abs(p);
	p = vec2(p.x * p.x - p.y * p.y, 2.0 * p.x * p.y) * 1.15;
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 0.58 + time * 0.22);
	col = clamp((col - 0.5) * 1.46 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
