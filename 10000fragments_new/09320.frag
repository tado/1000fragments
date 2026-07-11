uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 12.39 + t * 2.44 + ph) * 0.7;
    float wb = sin(p.y * 12.57 - t * 0.66 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.60;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x) + time * -0.41;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.37 / 3.1415927, 0.66 / r + time * 0.85);
	float d = field(tv, time, 0.0);
	vec3 col = vec3(0.18, 0.91, 0.43) * (0.19 / (abs(d) + 0.10));
	col = col / (1.0 + col);
	col *= clamp(r * 2.18, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
