uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 7.91 + sr * 19.79 - t * 0.55 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.86), field(p, time, 1.73));
	col = 0.5 + 0.5 * col;
	col = fract(col * 2.13);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
