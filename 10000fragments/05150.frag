uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 9.73 + sr * 23.18 - t * 2.14 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.11;
	p += vec2(-0.40, -0.98) * sin(length(p) * 3.09 - time * 0.90) * 0.11;
	p = abs(p);
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.38), field(p, time, 0.77));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
