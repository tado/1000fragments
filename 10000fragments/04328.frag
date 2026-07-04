uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 2.84 + sr * 12.84 - t * 3.61 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.37;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.85, 0.16, 0.61) * (0.15 / (abs(d) + 0.06));
	col = col / (1.0 + col);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.62 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
