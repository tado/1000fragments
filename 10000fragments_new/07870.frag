uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 13.45 + sin(p.y * 1.62 + t * 1.78) * 4.47 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 1.42), cos(time * 1.27)) * 0.05;
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.19 / 3.1415927, 1.17 / r - time * 2.87);
	tv.x += tv.y * 0.32;
	float d = field(tv, time, 0.0);
	vec3 col = vec3(0.87, 0.99, 0.33) * (0.13 / (abs(d) + 0.06));
	col = col / (1.0 + col);
	col *= clamp(r * 1.24, 0.0, 1.0);
	col = floor(clamp(col, 0.0, 1.0) * 6.0) / 6.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
