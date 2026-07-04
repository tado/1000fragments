uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float lv = length(p) * 5.77 - t * 1.72;
    v = sin(floor(lv * 3.7) / 3.7 * 6.2831853 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.70;
	p = mix(p, p.yx, 0.5 + 0.5 * sin(time * 1.47));
	p = rot2(p.y * 3.58 + time * 1.04) * p;
	p *= 1.0 + 0.18 * sin(time * 2.42);
	p = rot2(time * 1.18) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.36), field(p, time, 0.73));
	col = 0.5 + 0.5 * col;
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.09 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
