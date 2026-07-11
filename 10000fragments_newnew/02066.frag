uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float field(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 18.74);
    float gsh = hash21(vec2(grow, floor(t * 6.29))) - 0.5;
    float gx = p.x + gsh * 1.04;
    v = sin(gx * 14.86 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 3.79));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.29;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.18), field(p, time, 2.35));
	col = 0.5 + 0.5 * col;
	col = fract(col * 2.31);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
