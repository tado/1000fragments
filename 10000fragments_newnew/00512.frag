uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 2.02 + sr * 6.13 - t * 0.89 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.56;
	p += vec2(0.71, 0.74) * sin(length(p) * 5.00 - time * 2.46) * 0.37;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.27, 0.81, 0.78) * (0.22 / (abs(d) + 0.03));
	col = col / (1.0 + col);
	col *= 0.82 + 0.10 * sin(gl_FragCoord.y * 0.84 + time * 5.56);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
