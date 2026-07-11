uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 4.98 + t * 0.69 + ph) + sin(p.y * 14.31 - t * 4.60 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	{ p = vec2(atan(p.y, p.x) * 2.07, length(p) * 3.40 - time * 0.75); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.46), field(p, time, 0.92));
	col = 0.5 + 0.5 * col;
	col = fract(col * 1.97);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
