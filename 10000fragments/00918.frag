uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float field(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 6.71);
    float gsh = hash21(vec2(grow, floor(t * 8.86))) - 0.5;
    float gx = p.x + gsh * 1.15;
    v = sin(gx * 9.03 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 1.83));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.26;
	p = mix(p, p.yx, 0.5 + 0.5 * sin(time * 0.99));
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.89, 0.16, 0.41) * (0.23 / (abs(d) + 0.06));
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
