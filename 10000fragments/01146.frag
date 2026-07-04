uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 25.35 + sin(p.y * 2.35 + t * 1.11) * 4.62 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 0.96), cos(time * 0.88)) * 0.23;
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.97 / 3.1415927, 1.06 / r - time * 1.80);
	tv.x += tv.y * 0.39;
	float d = field(tv, time, 0.0);
	vec3 col = vec3(0.96, 0.18, 0.50) * (0.09 / (abs(d) + 0.08));
	col = col / (1.0 + col);
	col *= clamp(r * 2.12, 0.0, 1.0);
	col = mod(col * 2.83, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
