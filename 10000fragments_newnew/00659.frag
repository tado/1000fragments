uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 mc = p * (1.49 + 0.22 * sin(t * 0.98)) + vec2(-0.60, 0.30) + 0.02 * vec2(sin(ph), cos(ph));
    vec2 z = vec2(0.0);
    float mit = 0.0;
    for(int mi = 0; mi < 21; mi++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + mc; if(dot(z, z) > 4.0) break; mit += 1.0; }
    v = mit / 21.0 * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 0.73), cos(time * 1.48)) * 0.09;
	float an = atan(p.y, p.x) + time * -0.65;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.78 / 3.1415927, 0.83 / r + time * 1.61);
	tv.x += tv.y * 0.23;
	float d = field(tv, time, 0.0);
	vec3 col = hue(d * 0.73 + time * 0.37);
	col *= clamp(r * 2.28, 0.0, 1.0);
	col = mod(col * 2.66, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
