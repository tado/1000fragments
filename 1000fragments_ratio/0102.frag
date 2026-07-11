uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float field(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 6.46);
    float gsh = hash21(vec2(grow, floor(t * 2.04))) - 0.5;
    float gx = p.x + gsh * 1.00;
    v = sin(gx * 13.66 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 2.63));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = vec2(p.x * p.x - p.y * p.y, 2.0 * p.x * p.y) * 1.19;
	float d = field(p, (time * 0.81), 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(0.45, 0.47, 0.48) + vec3(0.11, 0.07, 0.09);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.16);
	col = clamp(col, 0.0, 1.0) * vec3(0.964, 1.008, 0.926) * 1.00 + 0.018;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
