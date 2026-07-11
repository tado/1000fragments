uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float field(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 19.42);
    float gsh = hash21(vec2(grow, floor(t * 7.35))) - 0.5;
    float gx = p.x + gsh * 0.61;
    v = sin(gx * 14.50 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 1.17));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.75;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.88), field(p, time, 1.76));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
