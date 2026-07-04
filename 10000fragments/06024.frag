uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float pa = atan(p.y, p.x) + t * 0.56;
    float pk = 6.2831853 / 4.0;
    float pd = cos(floor(0.5 + pa / pk) * pk - pa) * length(p);
    v = sin(pd * 14.26 - t * 4.07 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.45;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.12 + time * 0.27, vec3(0.48, 0.55, 0.45), vec3(0.31, 0.44, 0.47), vec3(1.30, 0.97, 1.05), vec3(0.63, 0.97, 0.32));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
