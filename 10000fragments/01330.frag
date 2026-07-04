uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 4.06 + vec2(t * 0.99, -t * 1.73) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 1.33), cos(time * 0.44)) * 0.20;
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.68 / 3.1415927, 1.13 / r - time * 2.89);
	tv.x += tv.y * 0.32;
	float d = field(tv, time, 0.0);
	vec3 col = vec3(0.71, 0.56, 0.59) * (0.09 / (abs(d) + 0.09));
	col = col / (1.0 + col);
	col *= clamp(r * 3.00, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
