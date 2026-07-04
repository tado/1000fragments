uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cp = p * 3.97;
    v = 0.5 * (sin(1.0 * cp.x + t * 1.12) * sin(7.0 * cp.y + ph)
             + sin(7.0 * cp.x - t * 1.19) * sin(1.0 * cp.y + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 0.83), cos(time * 1.42)) * 0.13;
	float an = atan(p.y, p.x) + time * -0.28;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.56 / 3.1415927, 0.59 / r + time * 1.41);
	tv.x += tv.y * 0.21;
	float d = field(tv, time, 0.0);
	vec3 col = hue(d * 0.44 + time * 0.18);
	col *= clamp(r * 2.11, 0.0, 1.0);
	col = floor(clamp(col, 0.0, 1.0) * 6.0) / 6.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
