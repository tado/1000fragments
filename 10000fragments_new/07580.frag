uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float field(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 19.31);
    float gsh = hash21(vec2(grow, floor(t * 9.34))) - 0.5;
    float gx = p.x + gsh * 0.87;
    v = sin(gx * 11.01 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 4.60));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.y += sin(p.x * 2.92 + time * 1.93) * 0.36;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.57), field(p, time, 1.14));
	col = 0.5 + 0.5 * col;
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.61 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
