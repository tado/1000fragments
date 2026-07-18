uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.80);
}

float field(vec2 p, float t, float ph){
    float v;
    float pa = atan(p.y, p.x) + t * 0.45;
    float pk = 6.2831853 / 3.0;
    float pd = cos(floor(0.5 + pa / pk) * pk - pa) * length(p);
    v = sin(pd * 23.23 - t * 2.94 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x) + (time * 0.71) * -0.38;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.85 / 3.1415927, 0.63 / r + (time * 0.71) * 0.57);
	float d = field(tv, (time * 0.71), 0.0);
	vec3 col = palette((d) * 0.81 + (time * 0.71) * 0.12, vec3(0.73, 0.59, 0.62), vec3(0.26, 0.24, 0.20), vec3(0.99, 0.99, 1.04), vec3(0.87, 0.01, 0.10));
	col *= clamp(r * 1.67, 0.0, 1.0);
	col = pow(clamp(col, 0.0, 1.0), vec3(0.53));
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.51);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.30);
	col *= vec3(0.965, 1.020, 0.939);
	col += 0.025;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.25 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
