uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float field(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 8.80);
    float gsh = hash21(vec2(grow, floor(t * 4.10))) - 0.5;
    float gx = p.x + gsh * 0.54;
    v = sin(gx * 6.97 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 3.17));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = sin(p * 2.32 + (time * 0.57) * 1.11) * 1.08;
	float d = field(p, (time * 0.57), 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(0.47, 0.51, 0.54) + vec3(0.01, 0.04, 0.06);
	col *= 0.87 + 0.15 * sin(gl_FragCoord.y * 2.13 + (time * 0.57) * 9.28);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.56);
	col = clamp(col, 0.0, 1.0) * vec3(1.007, 0.986, 1.010) * 1.00 + 0.038;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
