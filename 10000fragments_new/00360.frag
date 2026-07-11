uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float field(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 20.41);
    float gsh = hash21(vec2(grow, floor(t * 7.29))) - 0.5;
    float gx = p.x + gsh * 0.66;
    v = sin(gx * 8.18 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 1.64));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.01;
	p = (floor(p * 8.6) + 0.5) / 8.6;
	p = fract(p * 2.04) - 0.5;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.99), field(p, time, 1.99));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
