uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 15.86);
    float gsh = hash21(vec2(grow, floor(t * 5.09))) - 0.5;
    float gx = p.x + gsh * 1.04;
    v = sin(gx * 12.30 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 1.93));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.37;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.02 + time * 0.16, vec3(0.41, 0.47, 0.44), vec3(0.46, 0.45, 0.44), vec3(1.00, 0.86, 0.83), vec3(0.22, 0.37, 0.48));
	col *= 0.82 + 0.16 * sin(gl_FragCoord.y * 3.00 + time * 17.72);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
