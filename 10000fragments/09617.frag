uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 5.15 + vec2(t * 2.23, -t * 2.29) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.02 / 3.1415927, 1.50 / r + time * 2.69);
	tv.x += tv.y * 0.26;
	float d = field(tv, time, 0.0);
	vec3 col = vec3(0.33, 0.78, 0.92) * (0.17 / (abs(d) + 0.06));
	col = col / (1.0 + col);
	col *= clamp(r * 1.36, 0.0, 1.0);
	col = floor(clamp(col, 0.0, 1.0) * 6.0) / 6.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
