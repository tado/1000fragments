uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 mc = p * (1.11 + 0.44 * sin(t * 0.41)) + vec2(-0.67, 0.12) + 0.02 * vec2(sin(ph), cos(ph));
    vec2 z = vec2(0.0);
    float mit = 0.0;
    for(int mi = 0; mi < 31; mi++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + mc; if(dot(z, z) > 4.0) break; mit += 1.0; }
    v = mit / 31.0 * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 0.55), cos(time * 0.56)) * 0.25;
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.42 / 3.1415927, 0.95 / r + time * 1.26);
	tv.x += tv.y * 0.16;
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 1.23 + time * 0.14, vec3(0.54, 0.58, 0.55), vec3(0.45, 0.48, 0.32), vec3(1.09, 0.88, 1.26), vec3(0.94, 0.88, 0.31));
	col *= clamp(r * 1.67, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
