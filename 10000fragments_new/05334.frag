uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float field(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 20.84);
    float gsh = hash21(vec2(grow, floor(t * 4.66))) - 0.5;
    float gx = p.x + gsh * 0.80;
    v = sin(gx * 6.28 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 1.92));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.03;
	p = (floor(p * 9.3) + 0.5) / 9.3;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.20), field(p, time, 0.40));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
