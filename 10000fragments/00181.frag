uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 cp = p * 1.36;
    v = 0.5 * (sin(4.0 * cp.x + t * 1.12) * sin(2.0 * cp.y + ph)
             + sin(2.0 * cp.x - t * 1.43) * sin(4.0 * cp.y + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 0.78), cos(time * 1.00)) * 0.26;
	float an = atan(p.y, p.x) + time * -0.14;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.36 / 3.1415927, 0.62 / r + time * 0.90);
	float d = field(tv, time, 0.0);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 2.01 + time * 0.79);
	col *= clamp(r * 2.89, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
