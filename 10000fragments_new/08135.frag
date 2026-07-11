uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 25.85 + sin(p.y * 5.08 + t * 3.45) * 2.10 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 1.39), cos(time * 0.99)) * 0.22;
	float an = atan(p.y, p.x) + time * -0.59;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.08 / 3.1415927, 1.20 / r + time * 1.42);
	float d = field(tv, time, 0.0);
	vec3 col = vec3(0.93, 0.37, 0.33) * (0.18 / (abs(d) + 0.04));
	col = col / (1.0 + col);
	col *= clamp(r * 2.21, 0.0, 1.0);
	col = pow(clamp(col, 0.0, 1.0), vec3(0.58));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
