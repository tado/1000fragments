uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 mc = p * (1.27 + 0.20 * sin(t * 0.93)) + vec2(-0.21, -0.13) + 0.02 * vec2(sin(ph), cos(ph));
    vec2 z = vec2(0.0);
    float mit = 0.0;
    for(int mi = 0; mi < 17; mi++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + mc; if(dot(z, z) > 4.0) break; mit += 1.0; }
    v = mit / 17.0 * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin((time * 0.82) * 1.06), cos((time * 0.82) * 1.24)) * 0.07;
	float an = atan(p.y, p.x) + (time * 0.82) * 0.19;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.97 / 3.1415927, 0.66 / r - (time * 0.82) * 1.31);
	tv.x += tv.y * 0.31;
	float d = field(tv, (time * 0.82), 0.0);
	vec3 col = vec3(0.5 + 0.5 * (d)) * vec3(0.56, 0.55, 0.57) + vec3(0.07, 0.06, 0.06);
	col *= clamp(r * 2.14, 0.0, 1.0);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.50);
	col = clamp(col, 0.0, 1.0) * vec3(0.925, 0.972, 1.035) * 1.00 + 0.025;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
