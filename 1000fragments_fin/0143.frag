uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float field(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 23.98);
    float gsh = hash21(vec2(grow, floor(t * 2.75))) - 0.5;
    float gx = p.x + gsh * 0.90;
    v = sin(gx * 15.48 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 3.77));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = p.yx;
	float d = field(p, (time * 0.78), 0.0);
	vec3 col = vec3(0.957, 0.452, 0.412) * (0.09 / (abs(d) + 0.03));
	col = col / (1.0 + col);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.46);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.09);
	col *= vec3(1.022, 1.000, 0.948);
	col += 0.011;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.31 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
