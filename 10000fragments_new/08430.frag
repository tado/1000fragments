uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float field(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 16.33);
    float gsh = hash21(vec2(grow, floor(t * 9.73))) - 0.5;
    float gx = p.x + gsh * 1.03;
    v = sin(gx * 13.25 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 2.55));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.24;
	p += vec2(-0.80, -0.82) * sin(length(p) * 3.70 - time * 1.67) * 0.12;
	p.x += sin(p.y * 6.84 + time * 1.25) * 0.32;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.16, 0.10, 0.54), vec3(0.77, 0.76, 0.64), d);
	col += (hash21(gl_FragCoord.xy + fract(time) * 100.0) - 0.5) * 0.05;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
