uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 15.46 + t * 0.76 + ph) * 0.7;
    float wb = sin(p.y * 13.23 - t * 3.20 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.25;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 0.78), cos(time * 0.41)) * 0.18;
	float an = atan(p.y, p.x) + time * 0.56;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.53 / 3.1415927, 1.31 / r + time * 2.73);
	float d = field(tv, time, 0.0);
	vec3 col = vec3(0.88, 0.68, 0.55) * (0.25 / (abs(d) + 0.06));
	col = col / (1.0 + col);
	col *= clamp(r * 1.93, 0.0, 1.0);
	col = floor(clamp(col, 0.0, 1.0) * 5.0) / 5.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
