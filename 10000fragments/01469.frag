uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 14.47 - t * 1.57 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	{ p = vec2(atan(p.y, p.x) * 1.20, length(p) * 5.98 - time * 0.33); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.16), field(p, time, 2.33));
	col = 0.5 + 0.5 * col;
	col = mod(col * 2.81, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
