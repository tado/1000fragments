uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float field(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 22.67);
    float gsh = hash21(vec2(grow, floor(t * 5.31))) - 0.5;
    float gx = p.x + gsh * 0.95;
    v = sin(gx * 15.32 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 4.45));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.81;
	p += vec2(0.49, -0.71) * sin(length(p) * 3.77 - (time * 0.63) * 1.11) * 0.39;
	float d = field(p, (time * 0.63), 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(0.53, 0.52, 0.66) + vec3(0.01, 0.02, 0.00);
	col = clamp((col - 0.5) * 1.50 + 0.5, 0.0, 1.0);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.54);
	col = clamp(col, 0.0, 1.0) * vec3(1.008, 1.007, 1.004) * 1.00 + 0.019;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
