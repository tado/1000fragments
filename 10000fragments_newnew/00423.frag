uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 5.44 + t * 3.79 + ph) * 0.7;
    float wb = sin(p.y * 5.07 - t * 1.09 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.40;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 0.80), cos(time * 1.22)) * 0.22;
	float an = atan(p.y, p.x) + time * 0.37;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.90 / 3.1415927, 1.00 / r - time * 0.90);
	float d = field(tv, time, 0.0);
	vec3 col = vec3(0.72, 0.24, 0.49) * (0.21 / (abs(d) + 0.06));
	col = col / (1.0 + col);
	col *= clamp(r * 1.91, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
