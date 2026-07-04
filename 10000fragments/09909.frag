uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float fieldA(vec2 p, float t, float ph){
    float v;
    float pa = atan(p.y, p.x) + t * 0.14;
    float pk = 6.2831853 / 4.0;
    float pd = cos(floor(0.5 + pa / pk) * pk - pa) * length(p);
    v = sin(pd * 15.96 - t * 3.57 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float zx = abs(fract(p.x * 1.56 + t * 1.17) - 0.5) * 2.0;
    v = sin((p.y * 2.75 + zx * 1.08 + t * 1.35) * 3.1415927 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	vec2 q1 = p; vec2 q2 = p;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.79);
	float d = min(d1, d2);
	vec3 col = vec3(0.89, 0.86, 0.18) * (0.21 / (abs(d) + 0.08));
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
