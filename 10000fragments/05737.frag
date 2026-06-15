uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 11.45 + sr * 14.86 - t * 0.54 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = abs(p) - 0.25;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.64), field(p, time, 1.27));
	col = 0.5 + 0.5 * col;
	col = mod(col * 2.72, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
