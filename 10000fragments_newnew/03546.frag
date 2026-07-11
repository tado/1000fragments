uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float lv = length(p) * 2.82 - t * 1.69;
    v = sin(floor(lv * 2.0) / 2.0 * 6.2831853 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = mix(p, p.yx, 0.5 + 0.5 * sin(time * 2.40));
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.57), field(p, time, 1.14));
	col = 0.5 + 0.5 * col;
	col = mod(col * 1.60, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
