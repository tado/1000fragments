uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 mc = p * (1.22 + 0.15 * sin(t * 0.44)) + vec2(-0.36, -0.11) + 0.02 * vec2(sin(ph), cos(ph));
    vec2 z = vec2(0.0);
    float mit = 0.0;
    for(int mi = 0; mi < 27; mi++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + mc; if(dot(z, z) > 4.0) break; mit += 1.0; }
    v = mit / 27.0 * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 1.22), cos(time * 1.31)) * 0.13;
	float an = atan(p.y, p.x) + time * 0.64;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.58 / 3.1415927, 1.27 / r + time * 1.69);
	tv.x += tv.y * 0.22;
	float d = field(tv, time, 0.0);
	vec3 col = vec3(0.97, 0.60, 0.34) * (0.12 / (abs(d) + 0.07));
	col = col / (1.0 + col);
	col *= clamp(r * 2.18, 0.0, 1.0);
	col = mod(col * 1.82, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
